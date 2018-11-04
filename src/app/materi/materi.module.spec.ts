import { MateriModule } from './materi.module';

describe('MateriModule', () => {
  let materiModule: MateriModule;

  beforeEach(() => {
    materiModule = new MateriModule();
  });

  it('should create an instance', () => {
    expect(materiModule).toBeTruthy();
  });
});
