import { Component, Vue } from 'vue-property-decorator';
import { getDBMetas, addImages, deleteImages, addSearch, updateSearch, deleteSearch } from '@/api';
import VueTagsInput from '@johmun/vue-tags-input';

@Component({
  components: {
    VueTagsInput,
  },
})
export default class Search extends Vue {
  public isBusy = false;
  public metas: any[] = [];
  public fields = [
    'id',
    'years',
    'months',
    'moviesCount',
    'celebsCount',
    'type',
    'timestamp',
    'action',
  ];

  public async submit(metaId: number, type: string) {
    this.isBusy = true;

    if (type === 'add') {
      await addSearch(metaId);
    } else if (type === 'update') {
      await updateSearch(metaId);
    } else if (type === 'delete') {
      await deleteSearch(metaId);
    }

    this.metas = await getDBMetas();

    this.isBusy = false;
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
