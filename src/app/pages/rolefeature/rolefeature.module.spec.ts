import { RolefeatureModule } from './rolefeature.module';

describe('RolefeatureModule', () => {
  let rolefeatureModule: RolefeatureModule;

  beforeEach(() => {
    rolefeatureModule = new RolefeatureModule();
  });

  it('should create an instance', () => {
    expect(rolefeatureModule).toBeTruthy();
  });
});
