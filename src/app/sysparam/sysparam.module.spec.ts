import { SysParamModule } from './sysparam.module';

describe('SysParamModule', () => {
  let sysParamModule: SysParamModule;

  beforeEach(() => {
    sysParamModule = new SysParamModule();
  });

  it('should create an instance', () => {
    expect(sysParamModule).toBeTruthy();
  });
});
