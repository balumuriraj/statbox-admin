import { Component, Vue, Watch } from 'vue-property-decorator';
import Datepicker from 'vuejs-datepicker';
import VueTagsInput from '@johmun/vue-tags-input';
import {
  getMovieById,
  saveOrUpdateMovie,
  deleteMovieById, deleteRoleById,
  saveOrUpdateRole,
  getRolesByMovieId,
} from '@/api';
import { uploadImage, deleteImage } from '@/support/storageUtils';
import { searchCelebs } from '@/support/searchUtils';

@Component({
  components: {
    Datepicker,
    VueTagsInput,
  },
})
export default class Movie extends Vue {

  get cast() {
    return this.roles.filter((role: any) => role.category === 'cast');
  }

  get crew() {
    return this.roles.filter((role: any) => role.category === 'crew');
  }

  get deletedCast() {
    return this.deletedRoles.filter((role: any) => role.category === 'cast');
  }

  get deletedCrew() {
    return this.deletedRoles.filter((role: any) => role.category === 'crew');
  }

  get isNew() {
    return this.$route.params.id === 'new';
  }

  public isBusy = false;
  public item: any = {
    title: null,
    description: null,
    cert: null,
    poster: null,
    runtime: null,
    releaseDate: null,
    genre: [],
  };
  public file: any = null;
  public certs = [{ text: 'Select One', value: null }, 'U', 'A', 'U/A', 'B'];
  public tag: string = '';
  public tags: any[] = [];
  public allGenres: any[] = [{ text: 'Action' }, { text: 'Biography' }];
  public roles: any[] = [];
  public deletedRoles: any[] = [];
  public rolesDirty = false;
  public modalSearchTerm: string = '';
  public celebHits: any[] = [];
  public preview: any = null;
  public fields = [
    { key: 'celeb.id', label: 'Id' },
    { key: 'celeb.photo', label: 'Photo' },
    { key: 'celeb.name', label: 'Name' },
    { key: 'index', label: 'Priority' },
    { key: 'type', label: 'Type' },
    { key: 'actions', label: 'Actions' },
  ];
  public celebModal = {
    title: '',
    id: null,
    name: '',
    photo: '',
    type: '',
    index: null,
    category: '',
  };

  public addRole(id: number) {
    const idx = this.deletedRoles.findIndex((role) => role.id === id);
    const removed = this.deletedRoles.splice(idx, 1);
    this.roles.push(...removed);
    this.roles.sort((a, b) => (a.index || 0) - (b.index || 0));
    this.rolesDirty = true;
  }

  public editRole(id: number, button: any) {
    const idx = this.roles.findIndex((role) => role.id === id);
    const role = this.roles[idx];
    this.celebModal.title = 'Editing Role';
    this.celebModal.id = role.celeb.id;
    this.celebModal.name = role.celeb.name;
    this.celebModal.photo = role.celeb.photo;
    this.celebModal.type = role.type;
    this.celebModal.index = role.index;
    this.celebModal.category = role.category;
    this.$root.$emit('bv::show::modal', 'celebModal', button);
  }

  public deleteRole(id: number) {
    const idx = this.roles.findIndex((role) => role.id === id);
    const removed = this.roles.splice(idx, 1);
    this.deletedRoles.push(...removed);
    this.rolesDirty = true;
  }

  public showJSONModal(button: any) {
    this.$root.$emit('bv::show::modal', 'jsonModal', button);
  }

  public showCelebModal(role: string, button: any) {
    this.resetCelebModal();
    this.celebModal.title = `Adding Celeb to ${role}`;
    this.celebModal.category = role;
    this.$root.$emit('bv::show::modal', 'celebModal', button);
  }

  public saveModal(button: any) {
    if (!this.celebModal.id) {
      return;
    }

    const role = this.roles.find(
      (role) => role.celebId === this.celebModal.id && role.category === this.celebModal.category,
    );

    if (role) {
      role.type = this.celebModal.type;
      role.index = this.celebModal.index != null && Number(this.celebModal.index);
    } else {
      const newRole = {
        celebId: this.celebModal.id,
        movieId: this.item.id,
        celeb: {
          id: this.celebModal.id,
          name: this.celebModal.name,
          photo: this.celebModal.photo,
        },
        type: this.celebModal.type,
        index: this.celebModal.index != null && Number(this.celebModal.index),
        category: this.celebModal.category,
      };

      this.roles.push(newRole);
    }

    this.roles.sort((a, b) => (a.index || 0) - (b.index || 0));
    this.$root.$emit('bv::hide::modal', 'celebModal', button);
    this.rolesDirty = true;
  }

  public resetCelebModal() {
    this.modalSearchTerm = '';
    this.celebModal.title = '';
    this.celebModal.id = null;
    this.celebModal.name = '';
    this.celebModal.photo = '';
    this.celebModal.type = '';
    this.celebModal.index = null;
    this.celebModal.category = '';
  }

  public async saveMovie() {
    this.isBusy = true;

    if (this.item.id) {
      const path = `images/posters/${this.item.id}.jpg`;

      if (this.file) {
        this.item.poster = await uploadImage(path, this.file);
        this.preview = null;
        this.file = null;
      } else if (!this.item.poster) {
        await deleteImage(path);
      }
    }

    this.item = await saveOrUpdateMovie(this.item);

    if (this.rolesDirty) {
      const roles = [...this.roles];
      this.roles = [];

      for (const role of roles) {
        const updatedRole = {...role};
        delete updatedRole.celeb;
        const result = await saveOrUpdateRole(updatedRole);
        this.roles.push(result);
      }

      for (const deletedRole of this.deletedRoles) {
        await deleteRoleById(deletedRole.id);
      }
    }

    this.rolesDirty = false;
    this.isBusy = false;

    if (this.isNew) {
      this.$router.push(`/movies/${this.item.id}`);
    }
  }

  public async deleteMovie() {
    this.isBusy = true;

    this.item = await deleteMovieById(this.item.id);

    const roles = [...this.roles];
    this.roles = [];
    for (const role of roles) {
      await deleteRoleById(role.id);
    }

    this.isBusy = false;
    this.$router.push('/movies');
  }

  public removePoster() {
    this.item.poster = null;
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

  @Watch('modalSearchTerm')
  private async onModalSearchTermChanged(newVal: string, oldVal: string) {
    const term = newVal;

    if (term && term.length > 3) {
      this.celebHits = await searchCelebs(term);
    } else {
      this.celebHits = [];
    }
  }

  @Watch('tags')
  private onTagsChanged(newVal: any[], oldVal: any[]) {
    this.item.genre = newVal.map((tag) => tag.text);
  }

  @Watch('item.releaseDate')
  private onReleaseDateChanged(newVal: Date, oldVal: Date) {
    this.item.year = newVal && new Date(newVal).getFullYear();
  }

  private async fetchData() {
    this.isBusy = true;
    const idParam = this.$route.params.id;

    if (!this.isNew) {
      const id = Number(idParam);
      this.item = await getMovieById(id);
      this.tags = this.item.genre && this.item.genre.map((genre: string) => ({ text: genre }));
      this.roles = await getRolesByMovieId(id);
    }

    this.isBusy = false;
  }

  private async mounted() {
    this.fetchData();
  }
}
