import { Component, Vue } from 'vue-property-decorator';
import { getDBMetas, addImages, deleteImages } from '@/api';
import VueTagsInput from '@johmun/vue-tags-input';

@Component({
  components: {
    VueTagsInput,
  },
})
export default class Storage extends Vue {
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

    if (type === 'add' || type === 'update') {
      await addImages(metaId);
    } else if (type === 'delete') {
      await deleteImages(metaId);
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
