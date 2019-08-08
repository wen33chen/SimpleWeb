import { SharedPrimengModule } from './shared-primeng.module';

describe('SharedPrimengModule', () => {
  let sharedPrimengModule: SharedPrimengModule;

  beforeEach(() => {
    sharedPrimengModule = new SharedPrimengModule();
  });

  it('should create an instance', () => {
    expect(sharedPrimengModule).toBeTruthy();
  });
});
