import { Params } from '@angular/router';
import { ResourceCardItem } from '@school-hub/ui-elements';
import { LearnerResource } from './resource.model';
import { RESOURCE_KINDS, resourceSubject } from './resources.data';
import { resourceTime } from './resource-engine';
export function resourceCard(
  resource: LearnerResource,
  queryParams: Params,
): ResourceCardItem {
  return {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    subject: resourceSubject(resource),
    typeLabel: RESOURCE_KINDS[resource.kind].label,
    meta: resource.video
      ? `${resourceTime(resource.video.duration)} min`
      : resource.kind === 'link'
        ? 'External website'
        : `${resource.sections.length} sections · TXT`,
    tone: RESOURCE_KINDS[resource.kind].tone,
    artTone:
      resource.artTone ??
      (resource.kind === 'video'
        ? 'purple'
        : resource.kind === 'note'
          ? 'green'
          : resource.kind === 'past-question'
            ? 'blue'
            : resource.tone),
    icon: RESOURCE_KINDS[resource.kind].icon,
    symbol: resource.symbol,
    route: `/student/resources/${resource.id}`,
    queryParams,
    available: resource.available,
  };
}
export function resourceDate(date: string | number): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  });
}
