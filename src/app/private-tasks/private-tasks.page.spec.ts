import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivateTasksPage } from './private-tasks.page';

describe('PrivateTasksPage', () => {
  let component: PrivateTasksPage;
  let fixture: ComponentFixture<PrivateTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
