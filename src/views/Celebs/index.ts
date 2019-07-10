import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { getCelebsCount, getCelebs } from '@/api';

@Component
export default class Celebs extends Vue {
  public items: any[] = [];
  public count: number = 0;
  public perPage = 15;
  public currentPage = 1;
  public fields = ['id', 'photo', 'name', 'dob'];
  public isBusy = false;
  public layout = 'table';
  public searchTerm = '';

  @Watch('currentPage')
  private onCurrentPageChanged(newVal: string, oldVal: string) {
    this.fetchData();
  }

  private async fetchData() {
    this.isBusy = true;
    this.count = await getCelebsCount();
    const skip = (this.currentPage * this.perPage) - this.perPage;
    this.items = await getCelebs(this.perPage, skip);
    this.items.forEach((item) => {
      item.releaseDate = new Date(item.releaseDate).toLocaleDateString();
    });
    this.isBusy = false;
  }

  private async mounted() {
    this.fetchData();
  }
}
