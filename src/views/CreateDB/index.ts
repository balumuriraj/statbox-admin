import { Component, Vue, Watch } from 'vue-property-decorator';
import { getDBMetas, createDatabase, createMovieFromUrl } from '@/api';
import VueTagsInput from '@johmun/vue-tags-input';

@Component({
  components: {
    VueTagsInput,
  },
})
export default class CreateDB extends Vue {
  public isBusy = false;
  public url: string = '';
  public yearTag: string = '';
  public tag: string = '';
  public allTags = [
    { text: 'january' },
    { text: 'february' },
    { text: 'march' },
    { text: 'april' },
    { text: 'may' },
    { text: 'june' },
    { text: 'july' },
    { text: 'august' },
    { text: 'september' },
    { text: 'october' },
    { text: 'november' },
    { text: 'december' },
  ];
  public allYearTags = [
    { text: '2000' },
    { text: '2001' },
    { text: '2002' },
    { text: '2003' },
    { text: '2004' },
    { text: '2005' },
    { text: '2006' },
    { text: '2007' },
    { text: '2008' },
    { text: '2009' },
    { text: '2010' },
    { text: '2011' },
    { text: '2012' },
    { text: '2013' },
    { text: '2014' },
    { text: '2015' },
    { text: '2016' },
    { text: '2017' },
    { text: '2018' },
    { text: '2019' },
  ];
  public tags: Array<{ text: string }> = [];
  public yearTags: Array<{ text: string }> = [];
  public months: string[] = [];
  public years = ['2019'];
  public metas: any[] = [];
  public fields = [
    'id',
    'details',
    'moviesCount',
    'celebsCount',
    'type',
    'databaseUpdatedAt',
  ];

  public async createMovie() {
    this.isBusy = true;

    await createMovieFromUrl(this.url);
    this.metas = await getDBMetas();

    this.isBusy = false;
  }

  public async submit() {
    this.isBusy = true;

    await createDatabase(this.years, this.months);
    this.metas = await getDBMetas();

    this.isBusy = false;
  }

  public addAllTags() {
    this.tags = [...this.allTags];
  }

  public addAllYearTags() {
    this.yearTags = [...this.allYearTags];
  }

  @Watch('tags')
  private onTagsChanged(newVal: any[], oldVal: any[]) {
    this.months = newVal.map((tag) => tag.text);
  }

  @Watch('yearTags')
  private onYearTagsChanged(newVal: any[], oldVal: any[]) {
    this.years = newVal.map((tag) => tag.text);
  }

  private async fetchData() {
    this.isBusy = true;

    this.metas = await getDBMetas();

    this.isBusy = false;
  }

  private async mounted() {
    this.fetchData();
  }
}
