<!--Vista que sirve para iniciar sesión-->
<template>
  <v-container fluid class="pb-0 px-0 login-form d-flex align-space-between">
    <v-row class="my-10">
      <v-col
        v-if="$vuetify.breakpoint.mdAndUp"
        cols="12"
        md="6"
        class="d-flex justify-center align-center"
      >
        <v-img
          max-width="30vw"
          src="@/assets/images/branding/nova-color.png"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-row justify="center" class="d-flex align-center mb-5 mb-md-3">
          <v-col cols="10" sm="8" lg="6">
            <v-form ref="signInForm" v-model="validSignInForm" lazy-validation>
              <v-row>
                <v-col cols="12" class="d-flex justify-center mb-8">
                  <v-img
                    v-if="$vuetify.breakpoint.mdAndUp"
                    src="@/assets/images/user-image.png"
                    max-width="230"
                    max-height="230"
                  ></v-img>
                  <v-img
                    v-else
                    max-width="300"
                    src="@/assets/images/branding/nova-white.png"
                  ></v-img>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="dataUser.email"
                    class="v-text-field-style"
                    prepend-inner-icon="mdi-account-outline"
                    color="white"
                    elevation="0"
                    label="Correo electrónico"
                    type="email"
                    outlined
                    rounded
                    dark
                    v-on:keyup.enter="_login()"
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="dataUser.password"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    color="white"
                    label="Contraseña"
                    :type="showPass ? 'text' : 'password'"
                    outlined
                    rounded
                    dark
                    v-on:keyup.enter="_login()"
                    :rules="passwordRules"
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-btn
                    id="custom-disabled"
                    color="white"
                    rounded
                    block
                    @click="_login()"
                    large
                    :loading="loadingButton"
                    :disabled="
                      dataUser.email == '' ||
                      dataUser.password == '' ||
                      !validSignInForm
                    "
                    ><span
                      class="font-weight-black"
                      :class="
                        dataUser.email == '' ||
                        dataUser.password == '' ||
                        !validSignInForm
                          ? 'grey--text'
                          : 'primary--text'
                      "
                      >Iniciar sesión</span
                    ></v-btn
                  >
                </v-col>
                <v-col cols="12" class="text-end">
                  <p class="subtitle-1 mb-0 font-weight-bold">
                    ¿Haz olvidado tu contraseña?
                  </p>
                  <a
                    class="white--text font-weight-bold subtitle-1 mb-0"
                    href="/password-recover"
                    >Haz clic aquí</a
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import { validations } from "@/share/Validations";
export default {
  data() {
    return {
      dataUser: {
        email: "",
        password: "",
      },
      showPass: false,
      loadingButton: false,
      validSignInForm: false,
      // Validaciones
      emailRules: validations.emailValidation({
        required: true,
      }),
      passwordRules: validations.generalFValidation({
        required: true,
        name: "contraseña",
        minLength: 8,
      }),
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapMutations("loader", ["loading", "loaded"]),
    ...mapMutations("notification", ["show"]),
    /**
     * Función para validar que los campos del formulario de usuario hayan sido llenados de la forma correcta.
     */
    validateSignInForm() {
      if (this.$refs.signInForm.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    /**
     * Función que sirve para iniciar sesión
     */
    async _login() {
      if (this.validateSignInForm()) {
        this.loadingButton = true;
        let response = await this.login(this.dataUser);
        if (response.status && response.status > 199 && response.status < 300) {
          this.$router.push({ name: "Home" });
        } else {
          if (response.data.error) {
            this.show({
              text: response.data.error,
              color: "red accent-3",
            });
          } else {
            this.show({
              text: "Correo o contraseña incorrectos",
              color: "red accent-3",
            });
          }
        }
        this.loadingButton = false;
      }
    },
  },
};
</script>
<style scoped>
/* Estilos de boton deshabilitado */
#custom-disabled.v-btn--disabled {
  background-color: #e0e0e0 !important;
}

.v-text-field--outlined >>> fieldset {
  border-color: #ffffff;
  border-width: 2px;
  color: #ffffff;
}

@media (max-width: 959px) {
  .login-form {
    min-height: 100vh;
    background: rgb(0, 99, 175);
    background: linear-gradient(
      121deg,
      rgba(0, 99, 175, 1) 38%,
      rgba(24, 157, 217, 1) 88%
    );
  }
}

@media (min-width: 960px) {
  .login-form {
    min-height: 100vh;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 38%,
      rgba(136, 178, 207, 1) 55%,
      rgba(0, 108, 183, 1) 88%
    );
  }
}
</style>