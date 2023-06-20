<!--Vista que sirve para iniciar sesión-->
<template>
  <v-container fluid class="login-container">
    <v-row class="login-wrapper" justify="center" align="center">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="11" sm="7" md="5" lg="4" xl="3">
            <v-card class="px-8 pt-10 mt-16" rounded="xl">
              <v-form ref="signInForm" v-model="validSignInForm" lazy-validation>
                <v-row>
                  <v-col cols="12" class="d-flex justify-center my-4 my-sm-8">
                    <v-img
                      src="@/assets/images/branding/nova-pocket.png"
                      max-width="230"
                      max-height="230"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" class="py-0 pt-sm-0">
                    <v-text-field
                      v-model="dataUser.email"
                      class="v-text-field-style"
                      elevation="0"
                      label="Username"
                      type="email"
                      outlined
                      rounded
                      v-on:keyup.enter="_login()"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0 pt-sm-0">
                    <v-text-field
                      v-model="dataUser.password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      label="Password"
                      :type="showPass ? 'text' : 'password'"
                      outlined
                      rounded
                      v-on:keyup.enter="_login()"
                      :rules="passwordRules"
                      @click:append="showPass = !showPass"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-btn
                      id="custom-disabled"
                      color="accent"
                      rounded
                      block
                      @click="_login()"
                      large
                      elevation="0"
                      :loading="loadingButton"
                      :disabled="
                        dataUser.email == '' ||
                        dataUser.password == '' ||
                        !validSignInForm
                      "
                      >
                        Iniciar sesión
                      </v-btn
                    >
                  </v-col>
                  <v-col cols="12" class="text-center my-3 my-sm-5">
                    <a
                      class="font-weight-bold subtitle-1 mb-0 text-decoration-none"
                      href="/password-recover"
                      >Olvidé mi contraseña</a
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" class="d-flex justify-center my-4 my-sm-8">
            <v-img
              contain
              src="@/assets/images/branding/nova-white.png"
              max-width="200"
              height="auto"
            ></v-img>
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
        name: "username",
        required: true,
      }),
      passwordRules: validations.generalMValidation({
        required: true,
        name: "password",
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
/*#custom-disabled.v-btn--disabled {
  background-color: #e0e0e0 !important;
}*/

.v-text-field--outlined >>> fieldset {
  border-color: #006cb7;
  border-width: 2px;
  color: #006cb7;
}

.login-container {
  min-height: 100vh;
  width: 100vw;
  background-image: url("../assets/images/login-background.png");
  background-repeat: repeat-x;
  /*background-position: 0 0;*/
  background-position: center;
  background-size: cover;
}

.login-container-mobile {
  min-height: 100vh;
  width: 100vw;
  background-image: url("../assets/images/login-background-mobile.png");
  background-repeat: repeat-x;
  /*background-position: 0 0;*/
  background-position: right;
  background-size: cover;
}

.login-wrapper {
  min-height: 90vh;
  width: 100vw;
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