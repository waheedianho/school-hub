import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes), provideAnimationsAsync()],
    }).compileComponents();
  });

  it('should render page for parent when url is /parent', async () => {
    const harness = await RouterTestingHarness.create('/parent');
    expect(
      harness.routeNativeElement?.querySelector('p')?.textContent,
    ).toContain('Parent works!');
  });

  it('should render page for teacher when url is /teacher', async () => {
    const harness = await RouterTestingHarness.create('/teacher');
    expect(
      harness.routeNativeElement?.querySelector('h1')?.textContent,
    ).toContain('Dashboard');
  }, 15000);

  it('should render page for student when url is /student', async () => {
    const harness = await RouterTestingHarness.create('/student');
    expect(
      harness.routeNativeElement?.querySelector('h1')?.textContent,
    ).toContain('Dashboard');
  });

  it('should render page for school admin when url is /school-admin', async () => {
    const harness = await RouterTestingHarness.create('/school-admin');
    expect(
      harness.routeNativeElement?.querySelector('lib-school-admin p')
        ?.textContent,
    ).toContain('SchoolAdmin works!');
  });

  it('should render page for super admin when url is /super-admin', async () => {
    const harness = await RouterTestingHarness.create('/super-admin');
    expect(
      harness.routeNativeElement?.querySelector('lib-super-admin p')
        ?.textContent,
    ).toContain('SuperAdmin works!');
  });
});
