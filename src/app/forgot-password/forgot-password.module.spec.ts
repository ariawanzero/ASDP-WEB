import { ForgotModule } from './forgot-password.module';

describe('ForgotModule', () => {
  let forgotModule: ForgotModule;

  beforeEach(() => {
    forgotModule = new ForgotModule();
  });

  it('should create an instance', () => {
    expect(forgotModule).toBeTruthy();
  });
});
