import { Component, Vue } from 'vue-property-decorator';
import { firebaseLogin } from '@/support/firebaseUtils';

@Component
export default class Login extends Vue {
  get isLoading() {
    return this.$store.state.isLoading;
  }

  get error() {
    return this.$store.state.error;
  }

  public async login() {
    await firebaseLogin(this);
  }
}
