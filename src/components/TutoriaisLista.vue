<template>
  <div class="list row">
      <div class="col-md-8">
          <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Digite um titulo..." v-model="titulo" />
              <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="buscarTitulo">
                      Buscar
                  </button>
              </div>
          </div>
      </div>
      <div class="col-md-6">
          <h4>Lista de Tutoriais</h4>
          <ul class="list-group">
            <li class="list-group-item" :class="{active:index == currentIndex}" v-for="(tutorial, index) in tutoriais" :key="index" @click="definirTutorialAtivo(tutorial, index)">
              {{tutorial.titulo}}
            </li>
          </ul>
          <button class="m-3 btn btn-sm btn-danger" @click="removerTodosTutoriais">
              Excluir Todos
          </button>
      </div>
      <div class="col-md-6">
          <div v-if="currentTutorial">
              <h4>Tutorial</h4>
              <div>
                  <label>
                      <strong>Title: </strong>
                  </label> {{currentTutorial.titulo}}
              </div>
              <div>
                  <label>
                      <strong>Descrição: </strong>
                  </label>{{currentTutorial.descricao}}
              </div>
              <div>
                  <label>
                      <strong>Status: 
                      </strong>    
                  </label>{{currentTutorial.published ?"Published" : "Pending"}}
              </div>
              <router-link :to="'/tutoriais/' + currentTutorial.id" class="badge badge-warning">Editar</router-link>
          </div>
          <div v-else>
              <br />
              <p>Por favor clique no teturial...</p>
          </div>
      </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/tutorial.service";

export default {
    name: "tutoriais-lista",
    data() {
        return {
            tutoriais: [],
            currentTutorial: null,
            currentIndex: -1,
            titulo:""
        };
    },

    methods: {
        recuperarTutorial() {
            TutorialDataService.getAll()
            .then(response => {
                this.tutoriais = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },

        refreshLista() {
            this.recuperarTutorial();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },

        definirTutorialAtivo(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = tutorial ? index : -1;
        },

        removerTodosTutoriais() {
            TutorialDataService.deleteAll()
                               .then(response => {
                                   console.log(response.data);
                                   this.refreshLista();
                               })
                               .catch(e => {
                                   console.log(e);
                               });
        },

        buscarTitulo() {
            TutorialDataService.findByTitulo(this.title)
                               .then(response => {
                                   this.tutoriais = response.data;
                                   this.definirTutorialAtivo(null);
                                   console.log(response.data);
                               })
                               .catch(e=> {
                                   console.log(e);
                               });
        }
    },

    mounted() {
        this.recuperarTutorial();
    }
};
</script>

<style>
.list {
    text-align: left;
    max-width: 750px;
    margin:auto;
}
</style>