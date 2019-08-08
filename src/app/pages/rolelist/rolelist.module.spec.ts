import { RoleListModule } from './rolelist.module';

describe('RoleListModule', () => {
  let roleListModule: RoleListModule;

  beforeEach(() => {
    roleListModule = new RoleListModule();
  });

  it('should create an instance', () => {
    expect(roleListModule).toBeTruthy();
  });
});
