<template>
  <div>
    <p>Sign in</p>
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-input
          v-model="username"
          class="col-12"
          filled
          type="text"
          hint="Username"
        >
        </q-input>
        <q-input
          v-model="password"
          class="col-12"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn
          class="col-12"
          color="primary"
          label="Primary"
          @click="signIn()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const username = ref('');
const password = ref('');
const isPwd = ref(true);

const signIn = async (): Promise<void> => {
  console.log('login');
};
</script>
