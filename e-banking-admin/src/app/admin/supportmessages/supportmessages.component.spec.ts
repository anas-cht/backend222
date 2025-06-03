import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportmessagesComponent } from './supportmessages.component';

describe('SupportmessagesComponent', () => {
  let component: SupportmessagesComponent;
  let fixture: ComponentFixture<SupportmessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportmessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
