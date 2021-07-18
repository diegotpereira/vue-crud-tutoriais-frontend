<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
        <form>
        <div class="form-group">
            <label for="titulo">Titulo</label>
            <input type="text" class="form-control" id="titulo"
            v-model="currentTutorial.titulo"
            />
        </div>
        <div class="form-group">
            <label for="descricao">Descricão</label>
            <input type="text" class="form-control" id="descricao"
            v-model="currentTutorial.descricao"
            />
        </div>

        <div class="form-group">
            <label><strong>Status:</strong></label>
            {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>
        </form>

        <button class="badge badge-primary mr-2"
        v-if="currentTutorial.published"
        @click="updatePublished(false)"
        >
        Cancelar Publicação
        </button>
        <button v-else class="badge badge-primary mr-2"
        @click="updatePublished(true)"
        >
        Publicar
        </button>

        <button class="badge badge-danger mr-2"
        @click="deletarTutorial"
        >
        Excluir
        </button>

        <button type="submit" class="badge badge-success"
        @click="atualizarTutorial"
        >
        Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Clique em um tutorial...</p>
    </div>
</template>

<script>
export default {

    name: "tutorial",
    data() {
        return {
        currentTutorial: null,
        message: ''
        };
    },
    methods: {
        getTutorial(id) {
        TutorialDataService.get(id)
            .then(response => {
            this.currentTutorial = response.data;
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
        },

        updatePublished(status) {
        var data = {
            id: this.currentTutorial.id,
            title: this.currentTutorial.titulo,
            descricao: this.currentTutorial.descricao,
            published: status
        };

        TutorialDataService.update(this.currentTutorial.id, data)
            .then(response => {
            console.log(response.data);
            this.currentTutorial.published = status;
            this.message = 'O status foi atualizado com sucesso!';
            })
            .catch(e => {
            console.log(e);
            });
        },

        atualizarTutorial() {
        TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
            .then(response => {
            console.log(response.data);
            this.message = 'O tutorial foi atualizado com sucesso!';
            })
            .catch(e => {
            console.log(e);
            });
        },

        deletarTutorial() {
        TutorialDataService.delete(this.currentTutorial.id)
            .then(response => {
            console.log(response.data);
            this.$router.push({ name: "tutoriais" });
            })
            .catch(e => {
            console.log(e);
            });
        }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>