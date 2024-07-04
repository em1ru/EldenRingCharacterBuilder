<template>
    <div>
      <label for="armor">Armor:</label>
      <select v-model="selectedArmor" @change="updateArmor">
        <option v-for="armor in armors" :key="armor.id" :value="armor.name">
          {{ armor.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'ArmorSelector',
    data() {
      return {
        selectedArmor: ''
      };
    },
    computed: {
      ...mapGetters(['getArmors']),
      armors() {
        console.log('Armors in component:', this.getArmors);
        return this.getArmors;
      }
    },
    methods: {
      ...mapActions(['updateBuild']),
      updateArmor(event) {
        const armor = event.target.value;
        this.$store.dispatch('updateBuild', {
          ...this.$store.state.build,
          equipment: { ...this.$store.state.build.equipment, armor }
        });
      }
    },
    watch: {
      selectedArmor(newArmor) {
        this.updateArmor({ target: { value: newArmor } });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  