<!--Vista de recuperación de contraseña
    En esta sección se ingresa el email del usuario del que desean recuperar la contraseña y posteriormente
    le llega un correo con un enlace para ingresar la nueva contraseña
-->
<template>
  <v-container
    fluid
    class="pb-0 px-0 d-flex align-center"
  >
    <v-row
      justify="center"
      class="d-flex align-center background-image"
    >
      <v-col cols="11" sm="7" md="5" lg="4" xl="3">
        <v-card class="px-8 pt-10 mt-16" rounded="xl">
          <v-form
            ref="passwordRecoverForm"
            v-model="validPasswordRecoverForm"
            lazy-validation
          >
            <v-row>
              <v-col cols="12" class="d-flex justify-center mb-8">
                <v-img
                  src="@/assets/images/branding/nova-pocket.png"
                  max-width="230"
                  max-height="230"
                ></v-img>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model.trim="email"
                  elevation="0"
                  label="Correo electrónico"
                  type="email"
                  outlined
                  rounded
                  :rules="emailRules"
                  @keyup="validateEmail()"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn
                  id="custom-disabled"
                  color="accent"
                  rounded
                  @click="_emailCode()"
                  large
                  elevation="0"
                  :loading="loadingButton"
                  :disabled="email == '' || !validEmail"
                  >Enviar</v-btn
                >
              </v-col>
              <v-col cols="12" class="text-center mb-7">
                <p class="subtitle-1 mb-0 font-weight-bold">
                  ¿Ya tienes una cuenta?
                </p>
                <a class="subtitle-1 font-weight-bold mb-0 text-decoration-none" href="/"
                  >Iniciar sesión</a
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import { validations } from "@/share/Validations";
import { ErrorHandler } from "../share/ErrorHandler";
export default {
  data() {
    return {
      email: "",
      loadingButton: false,
      validPasswordRecoverForm: false,
      validEmail: true,
      // Validaciones
      emailRules: validations.emailValidation({
        required: true,
      }),
    };
  },
  methods: {
    ...mapActions("auth", ["emailCode"]),
    ...mapMutations("loader", ["loading", "loaded"]),
    ...mapMutations("notification", ["show"]),
    /**
     * Función para validar el campo de email.
     */
    validateEmail() {
      this.validEmail = /.+@.+\..+/.test(this.email);
    },
    /**
     * Función que sirve para enviar un correo con las instrucciones para recuperar contraseña al usuario que desea recuperar su contraseña
     */
    async _emailCode() {
      this.loadingButton = true;
      let response = await this.emailCode(this.email);
      if (response.status && response.status > 199 && response.status < 300) {
        this.show({
          text:
            "Por favor revisa tu bandeja de entrada y sigue las instrucciones para recuperar tu contraseña",
          color: "accent",
        });
        this.loadingButton = false;
        this.$router.push("/");
      } else {
        this.show({ text: response.data.error, color: "red accent-3" });
      }
      this.loadingButton = false;
    },
  },
};
</script>
<style scoped>
/* Estilos de boton deshabilitado */
/*#custom-disabled.v-btn--disabled {
  background-color: #e0e0e0 !important;
}*/

.password-reset-container {
  min-height: 100vh;
  background: rgb(0, 99, 175);
  background: linear-gradient(
    121deg,
    rgba(0, 99, 175, 1) 38%,
    rgba(24, 157, 217, 1) 88%
  );
}
/*.background-image {
  min-height: 98vh;
  background-image: url("../assets/images/branding/nova-white-trans.png");
  background-size: 70%;
  background-position: center center;
}*/

.background-image {
  min-height: 103vh;
  width: 100vw;
  background-image: url("../assets/images/login-background.png");
  background-repeat: repeat-x;
  /*background-position: 0 0;*/
  background-position: center;
  background-size: cover;
}
.v-text-field--outlined >>> fieldset {
  border-color: #006cb7;
  border-width: 2px;
  color: #006cb7;
}
</style>