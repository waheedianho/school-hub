/** Original silent revision clips. Run with: node scripts/generate-resource-videos.mjs */
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  mkdtempSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const clips = {
  'parts-of-speech': {
    title: 'Parts of Speech Explained',
    subject: 'English Language',
    color: '#7135d4',
    scenes: [
      [
        'Introduction',
        'Words have different jobs in a sentence. Learn eight common parts of speech.',
        'Read each definition and example.',
      ],
      [
        'Nouns',
        'A noun names a person, place, thing, or idea.',
        'The teacher opened the book.',
      ],
      [
        'Pronouns',
        'A pronoun takes the place of a noun or noun phrase.',
        'Amina is reading. She likes stories.',
      ],
      [
        'Verbs',
        'A verb expresses an action or a state.',
        'The children play. The room is quiet.',
      ],
      [
        'Adjectives',
        'An adjective describes a noun or pronoun.',
        'The small bird has blue feathers.',
      ],
      [
        'Adverbs',
        'An adverb can describe a verb, adjective, or another adverb.',
        'She reads carefully. It is very cold.',
      ],
      [
        'Prepositions',
        'A preposition shows a relationship, often of place or time.',
        'The bag is under the table.',
      ],
      [
        'Conjunctions',
        'A conjunction joins words, phrases, or clauses.',
        'I wanted to play, but it rained.',
      ],
      [
        'Interjections',
        'An interjection expresses a sudden feeling or reaction.',
        'Wow! That is a beautiful painting.',
      ],
      [
        'Summary & Practice',
        'A word can have different jobs in different sentences. Look at how it is used.',
        'I drink water. / I need a drink.',
      ],
    ],
  },
  'direct-indirect-speech': {
    title: 'Direct and Indirect Speech',
    subject: 'English Language',
    color: '#7135d4',
    scenes: [
      [
        'Direct Speech',
        'Direct speech repeats the exact words of a speaker. Use quotation marks.',
        'Amina said, "I am ready."',
      ],
      [
        'Indirect Speech',
        'Indirect speech reports what someone said without quoting the exact words.',
        'Amina said that she was ready.',
      ],
      [
        'Pronouns and Time',
        'Check pronouns, verb tense, and time words when reporting speech.',
        '"I will go tomorrow" can become "She would go the next day."',
      ],
      [
        'Try It',
        'Report this sentence: Tunde said, "I like football."',
        'Tunde said that he liked football.',
      ],
    ],
  },
  'whole-number-operations': {
    title: 'Whole Numbers: Operations',
    subject: 'Mathematics',
    color: '#2465d7',
    scenes: [
      [
        'Choose an Operation',
        'Addition combines. Subtraction finds a difference. Multiplication makes equal groups. Division shares equally.',
        'Read the problem before choosing an operation.',
      ],
      [
        'Addition',
        'Align digits by place value. Add from the ones column and regroup when needed.',
        '245 + 378 = 623',
      ],
      [
        'Subtraction',
        'Regroup carefully across zeros. Check a subtraction answer by adding it back.',
        '5,000 - 1,287 = 3,713',
      ],
      [
        'Multiplication',
        'Break a number into easier parts, then add the products.',
        '24 x 5 = (20 x 5) + (4 x 5) = 120',
      ],
      [
        'Division and Checking',
        'Multiplication and division are inverse operations.',
        '120 / 5 = 24. Check: 24 x 5 = 120.',
      ],
    ],
  },
  'living-things': {
    title: 'Living and Non-living Things',
    subject: 'Basic Science',
    color: '#16845e',
    scenes: [
      [
        'Look for Life Processes',
        'Living things grow, respire, reproduce, respond, excrete, and need nutrients.',
        'Plants and animals are living things.',
      ],
      [
        'Movement Is Not Enough',
        'A moving object is not necessarily living. Use several life processes as evidence.',
        'A car moves, but it does not grow or reproduce.',
      ],
      [
        'Seeds and Plants',
        'A seed is living even when it is not visibly growing. Suitable conditions help it germinate.',
        'Green plants need light, water, air, and suitable conditions.',
      ],
      [
        'Compare and Classify',
        'Explain why an example belongs in a group.',
        'A tree is living. A stone is non-living.',
      ],
    ],
  },
};
const output = 'apps/shell/public/resources/videos';
mkdirSync(output, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'school-hub-resource-video-'));
const wrap = (text, width) =>
  text
    .match(new RegExp(`.{1,${width}}(?:\\s|$)|\\S+`, 'g'))
    .map((line) => line.trim())
    .join('\n');
const escapeXml = (text) =>
  text.replace(
    /[<>&"]/g,
    (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[char],
  );
const stamp = (seconds) =>
  `00:${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}.000`;
const manifest = {};
try {
  for (const [id, clip] of Object.entries(clips)) {
    const chapters = clip.scenes.map(([title, text, example], index) => ({
      title,
      text,
      example,
      start: index * 15,
    }));
    const paths = [];
    for (const [index, scene] of chapters.entries()) {
      const target = join(work, `${id}-${index}.mp4`);
      const font = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
      const drawLines = (text, width, prefix, x, y, size, color, lineHeight) =>
        wrap(text, width)
          .split('\n')
          .map((line, lineIndex) => {
            const file = join(
              work,
              `${id}-${index}-${prefix}-${lineIndex}.txt`,
            );
            writeFileSync(file, line);
            return `drawtext=fontfile=${font}:textfile=${file}:x=${x}:y=${y + lineIndex * lineHeight}:fontsize=${size}:fontcolor=${color}`;
          });
      const filter = [
        `drawbox=x=0:y=0:w=22:h=720:color=${clip.color}:t=fill`,
        `drawtext=fontfile=${font}:text='${clip.subject}':x=70:y=40:fontsize=26:fontcolor=${clip.color}`,
        ...drawLines(scene.title, 34, 'title', 70, 110, 48, '0x17233c', 60),
        ...drawLines(scene.text, 64, 'body', 70, 255, 29, '0x364664', 44),
        `drawbox=x=65:y=420:w=1150:h=168:color=white:t=fill`,
        ...drawLines(scene.example, 51, 'example', 88, 455, 34, clip.color, 47),
        `drawtext=fontfile=${font}:text='SchoolHub | Silent revision video | ${index + 1} of ${chapters.length}':x=70:y=650:fontsize=22:fontcolor=0x66738c`,
      ].join(',');
      execFileSync('ffmpeg', [
        '-loglevel',
        'error',
        '-y',
        '-f',
        'lavfi',
        '-i',
        'color=c=0xf6f3ff:s=1280x720:r=4:d=15',
        '-vf',
        filter,
        '-c:v',
        'libx264',
        '-preset',
        'ultrafast',
        '-crf',
        '22',
        '-pix_fmt',
        'yuv420p',
        '-an',
        target,
      ]);
      paths.push(target);
    }
    const list = join(work, `${id}-concat.txt`);
    writeFileSync(list, paths.map((path) => `file '${path}'`).join('\n'));
    const file = join(output, `${id}.mp4`);
    execFileSync('ffmpeg', [
      '-loglevel',
      'error',
      '-y',
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      list,
      '-c',
      'copy',
      '-movflags',
      '+faststart',
      file,
    ]);
    const lines = wrap(clip.title, 24).split('\n');
    const poster = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="#f6f2fc"/><circle cx="1100" cy="150" r="330" fill="#eee5fc"/><rect x="64" y="65" width="400" height="58" rx="12" fill="${clip.color}"/><text x="85" y="104" font-family="Arial,sans-serif" font-size="29" fill="white">${clip.subject}</text>${lines.map((line, index) => `<text x="66" y="${240 + index * 82}" font-family="Arial,sans-serif" font-weight="700" font-size="64" fill="${index ? clip.color : '#17203b'}">${escapeXml(line)}</text>`).join('')}<rect x="70" y="500" width="670" height="100" rx="15" fill="#263350"/><text x="95" y="543" font-family="Arial,sans-serif" font-size="27" fill="white">Clear definitions. Everyday examples.</text><text x="95" y="579" font-family="Arial,sans-serif" font-size="24" fill="white">JSS 1 (Basic 7) · Silent revision video</text><g transform="translate(965 250) rotate(12)"><rect x="-75" y="-60" width="230" height="300" rx="20" fill="${clip.color}"/><rect x="-50" y="-40" width="180" height="270" rx="8" fill="white"/><path d="M-20 30H95M-20 75H95M-20 120H75" stroke="${clip.color}" stroke-width="13" stroke-linecap="round"/><circle cx="65" cy="200" r="66" fill="${clip.color}"/><path d="M47 171L94 200L47 229Z" fill="white"/></g><text x="70" y="670" font-family="Arial,sans-serif" font-size="24" fill="${clip.color}">SchoolHub · Learn. Practise. Grow.</text></svg>`;
    writeFileSync(join(output, `${id}.svg`), poster);
    writeFileSync(
      join(output, `${id}.vtt`),
      'WEBVTT\n\n' +
        chapters
          .map(
            (scene, index) =>
              `${index + 1}\n${stamp(scene.start)} --> ${stamp(scene.start + 15)}\n${scene.title}. ${scene.text}\n${scene.example}\n`,
          )
          .join('\n'),
    );
    manifest[id] = {
      src: `/resources/videos/${id}.mp4`,
      poster: `/resources/videos/${id}.svg`,
      captions: `/resources/videos/${id}.vtt`,
      duration: chapters.length * 15,
      bytes: readFileSync(file).length,
      chapters,
    };
  }
  writeFileSync(
    'libs/module/student/src/resources/resources-videos.data.ts',
    `// Generated by scripts/generate-resource-videos.mjs.\nimport { ResourceVideo } from './resource.model';\nexport const RESOURCE_VIDEOS: Readonly<Record<string, ResourceVideo>> = ${JSON.stringify(manifest, null, 2)};\n`,
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}
