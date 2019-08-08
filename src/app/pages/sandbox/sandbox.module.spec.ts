import { SandboxModule } from './sandbox.module';

describe('ComSampleModule', () => {
  let sandboxModule: SandboxModule;

  beforeEach(() => {
    sandboxModule = new SandboxModule();
  });

  it('should create an instance', () => {
    expect(sandboxModule).toBeTruthy();
  });
});
