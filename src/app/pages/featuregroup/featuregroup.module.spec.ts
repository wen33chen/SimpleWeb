import { FeaturegroupModule } from './featuregroup.module';

describe('FeaturegroupModule', () => {
  let featuregroupModule: FeaturegroupModule;

  beforeEach(() => {
    featuregroupModule = new FeaturegroupModule();
  });

  it('should create an instance', () => {
    expect(featuregroupModule).toBeTruthy();
  });
});
