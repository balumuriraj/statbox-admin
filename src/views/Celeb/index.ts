import { Component, Vue, Watch } from 'vue-property-decorator';
import Datepicker from 'vuejs-datepicker';
import {
  deleteRoleById,
  saveOrUpdateRole,
  getCelebById,
  deleteCelebById,
  saveOrUpdateCeleb,
  getRolesByCelebId,
} from '@/api';
import { uploadImage, deleteImage } from '@/support/firebaseUtils';
import { searchMovies } from '@/support/algoliaUtils';

@Component({
  components: {
    Datepicker,
  },
})
export default class Celeb extends Vue {
  get isNew() {
    return this.$route.params.id === 'new';
  }

  public isBusy = false;
  public item: any = {
    name: null,
    photo: null,
    dob: null,
  };
  public file: any = null;
  public roles: any[] = [];
  public deletedRoles: any[] = [];
  public rolesDirty = false;
  public modalSearchTerm: string = '';
  public movieHits: any[] = [];
  public preview: any = null;
  public fields = [
    { key: 'movie.id', label: 'Id' },
    { key: 'movie.poster', label: 'Poster' },
    { key: 'movie.title', label: 'Title' },
    { key: 'index', label: 'Priority' },
    { key: 'type', label: 'Type' },
    { key: 'actions', label: 'Actions' },
  ];
  public movieModal = {
    header: '',
    id: null,
    title: '',
    poster: '',
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
    this.movieModal.header = 'Editing Role';
    this.movieModal.id = role.movie.id;
    this.movieModal.title = role.movie.title;
    this.movieModal.poster = role.movie.poster;
    this.movieModal.type = role.type;
    this.movieModal.index = role.index;
    this.movieModal.category = role.category;
    this.$root.$emit('bv::show::modal', 'movieModal', button);
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

  public showMovieModal(button: any) {
    this.resetMovieModal();
    this.movieModal.header = `Adding Movie Role`;
    this.$root.$emit('bv::show::modal', 'movieModal', button);
  }

  public saveModal(button: any) {
    if (!this.movieModal.id) {
      return;
    }

    const role = this.roles.find(
      (role) => role.movieId === this.movieModal.id && role.category === this.movieModal.category,
    );

    if (role) {
      role.type = this.movieModal.type;
      role.index = this.movieModal.index != null && Number(this.movieModal.index);
    } else {
      const newRole = {
        movieId: this.movieModal.id,
        celebId: this.item.id,
        movie: {
          id: this.movieModal.id,
          title: this.movieModal.title,
          poster: this.movieModal.poster,
        },
        type: this.movieModal.type,
        index: this.movieModal.index != null && Number(this.movieModal.index),
        category: this.movieModal.category,
      };

      this.roles.push(newRole);
    }

    this.roles.sort((a, b) => (a.index || 0) - (b.index || 0));
    this.$root.$emit('bv::hide::modal', 'movieModal', button);
    this.rolesDirty = true;
  }

  public resetMovieModal() {
    this.modalSearchTerm = '';
    this.movieModal.header = '';
    this.movieModal.id = null;
    this.movieModal.title = '';
    this.movieModal.poster = '';
    this.movieModal.type = '';
    this.movieModal.index = null;
    this.movieModal.category = '';
  }

  public async saveCeleb() {
    this.isBusy = true;

    if (this.item.id) {
      const path = `images/photos/${this.item.id}.jpg`;

      if (this.file) {
        this.item.photo = await uploadImage(path, this.file);
        this.preview = null;
        this.file = null;
      } else if (!this.item.photo) {
        await deleteImage(path);
      }
    }

    this.item = await saveOrUpdateCeleb(this.item);

    if (this.rolesDirty) {
      const roles = [...this.roles];
      this.roles = [];

      for (const role of roles) {
        const updatedRole = {...role};
        delete updatedRole.movie;
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
      this.$router.push(`/celebs/${this.item.id}`);
    }
  }

  public async deleteCeleb() {
    this.isBusy = true;

    this.item = await deleteCelebById(this.item.id);

    const roles = [...this.roles];
    this.roles = [];
    for (const role of roles) {
      await deleteRoleById(role.id);
    }

    this.isBusy = false;
    this.$router.push('/celebs');
  }

  public removePhoto() {
    this.item.photo = null;
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
      this.movieHits = await searchMovies(term);
    } else {
      this.movieHits = [];
    }
  }

  private async fetchData() {
    this.isBusy = true;
    const idParam = this.$route.params.id;

    if (!this.isNew) {
      const id = Number(idParam);
      this.item = await getCelebById(id);
      this.roles = await getRolesByCelebId(id);
    }

    this.isBusy = false;
  }

  private async mounted() {
    this.fetchData();
  }
}
