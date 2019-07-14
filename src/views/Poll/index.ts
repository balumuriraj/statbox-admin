import { Component, Vue, Watch } from 'vue-property-decorator';
import Datepicker from 'vuejs-datepicker';
import {
  getPollById,
  deletePollById,
  saveOrUpdatePoll,
} from '@/api';
import { uploadImage, deleteImage } from '@/support/firebaseUtils';

@Component({
  components: {
    Datepicker,
  },
})
export default class Poll extends Vue {
  get isNew() {
    return this.$route.params.id === 'new';
  }

  public isBusy = false;
  public item: any = {
    title: null,
    image: null,
    type: null,
    filter: null,
  };
  public file: any = null;
  public preview: any = null;
  public types = ['year', 'celeb'];

  public showJSONModal(button: any) {
    this.$root.$emit('bv::show::modal', 'jsonModal', button);
  }

  public async savePoll() {
    this.isBusy = true;

    if (this.item.id) {
      const path = `images/polls/${this.item.id}.jpg`;

      if (this.file) {
        this.item.image = await uploadImage(path, this.file);
        this.preview = null;
        this.file = null;
      } else if (!this.item.image) {
        await deleteImage(path);
      }
    }

    this.item = await saveOrUpdatePoll(this.item);

    this.isBusy = false;

    if (this.isNew) {
      this.$router.push(`/polls/${this.item.id}`);
    }
  }

  public async deletePoll() {
    this.isBusy = true;

    this.item = await deletePollById(this.item.id);

    this.isBusy = false;
    this.$router.push('/celebs');
  }

  public removePhoto() {
    this.item.image = null;
  }

  @Watch('file')
  private onFileChanged(newVal: any, oldVal: any) {
    if (this.file) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.preview = reader.result;
      });

      reader.readAsDataURL(this.file);
    }
  }

  private async fetchData() {
    this.isBusy = true;
    const idParam = this.$route.params.id;

    if (!this.isNew) {
      const id = Number(idParam);
      this.item = await getPollById(id);
    }

    this.isBusy = false;
  }

  private async mounted() {
    this.fetchData();
  }
}
