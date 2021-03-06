import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user.service';
import { ArticleViewComponent } from './article-view.component';
import { TitleComponent } from '../../sharedComponents/title/title.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../services/news.service'

const mockArticle = {
  author: "Cool User",
  content: "A migrant caravan has made its way to the Texas border, more family members are being apprehended than ever before and numerous large groups of Central American migrants are crossing illegally into the US.Congressional Democrats have pushed back on the White House plans, arguing that the President is fearmongering and that the situation on the border in no way qualifies as a national emergency. 'No sensible person believes there is an emergency at the southern border. Illegal immigration is at record lows, and families with children who lawfully seek asylum are not foreign invaders', said House Judiciary Committee Chairman Jerry Nadler (D-New York), in a statement Thursday. Nadler said he will support a resolution to terminate the President's emergency declaration, should he issue one.",
  description: "Officials tasked with carrying out the nation's border security mission are facing a trifecta of migration challenges.",
  publishedAt: "2019-02-15T11:47:29Z",
  source: {"id": "local", "name": "Local"},
  title: "This is the test title",
  url: "",
  urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/190207113233-border-wall-us-mexico-super-tease.jpg",
  imageType: "URL"
}

let testDelete = false;

class MockNews {
  public getArticle() {
    return mockArticle;
  }

  public getSource() {
    return {
      id: 'local'
    }
  }

  public deleteArticle() {
    testDelete = true
    return;
  }
}

describe('ArticleViewComponent', () => {
  let component: ArticleViewComponent;
  let fixture: ComponentFixture<ArticleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArticleViewComponent,
        TitleComponent
      ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [
        UserService,
        {provide: NewsService, useClass: MockNews}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should call Delete event', () => {
    const service: UserService = TestBed.get(UserService);
    const newsService: NewsService = TestBed.get(NewsService);
    service.login();

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.delete');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(testDelete).toBe(true);
  });
});
