import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivateTaskPage } from './private-task.page';

describe('PrivateTaskPage', () => {
  let component: PrivateTaskPage;
  let fixture: ComponentFixture<PrivateTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
