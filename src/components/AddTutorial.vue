<template>
  <div class="submit-form">
      <div v-if="!submitted">
          <div class="form-group">
              <label for="titulo">Titulo</label>
              <input type="text" class="form-control" id="titulo" required v-model="tutorial.titulo" name="titulo" />
          </div> 
          <div class="form-group">
              <label for="descricao">Descrição</label>
              <input type="text" class="form-control" id="descricao" required v-model="tutorial.descricao" name="descricao" />
          </div>

          <button @click="salvarTutorial" class="btn btn-success">Enviar</button>
      </div>
      <div v-else>
          <h4>Você se inscreveu com sucesso!</h4>
          <button class="btn btn-success" @click="novaTutorial">Novo</button>
      </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/tutorial.service";

export default {
    name: "add-tutorial",
    data() {
        return {
            tutorial: {
                id: null,
                titulo: "",
                descricao: "",
                published: false
            },
            submitted:false
        };
    },

    methods: {
        salvarTutorial() {
            var data = {
                titulo: this.tutorial.titulo,
                descricao: this.tutorial.descricao
            };

            TutorialDataService.create(data) 
                               .then(response => {
                                   this.tutorial.id = response.data.id;
                                   console.log(response.data);
                                   this.submitted = true;
                               })
                               .catch(e => {
                                   console.log(e);
                               });
        },

        novaTutorial() {
            this.submitted = false;
            this.tutorial = {}
        }
    }
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>