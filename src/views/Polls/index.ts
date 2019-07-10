import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { getPollsCount, getPolls } from '@/api';

@Component
export default class Polls extends Vue {
  public items: any[] = [];
  public count: number = 0;
  public perPage = 15;
  public currentPage = 1;
  public fields = ['id', 'title', 'type', 'filter', 'timestamp'];
  public isBusy = false;
  public layout = 'table';
  public searchTerm = '';

  @Watch('currentPage')
  private onCurrentPageChanged(newVal: string, oldVal: string) {
    this.fetchData();
  }

  private async fetchData() {
    this.isBusy = true;
    this.count = await getPollsCount();
    const skip = (this.currentPage * this.perPage) - this.perPage;
    this.items = await getPolls(this.perPage, skip);
    this.isBusy = false;
  }

  private async mounted() {
    this.fetchData();
  }
}
