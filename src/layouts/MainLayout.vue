<template>
  <div class="q-pa-md">
    <!--
      Anything after view="lHh lpr lFf" is only needed
      so we can display this example in the documentation

      Remove this part: container style="height: 400px" class="shadow-2 rounded-borders"
    -->
    <q-layout view="lHh lpr lFf">
      <q-header elevated>
        <q-bar
          class="q-electron-drag q-pa-none bg-blue-grey-10"
          v-if="$q.platform.is.electron"
        >
          <q-icon name="laptop_chromebook" class="q-mx-lg" />
          <q-space />
          <div><h6>CadSichter</h6></div>
          <q-space />

          <q-btn-group flat>
            <q-btn
              flat
              icon="minimize"
              color="none"
              text-color="blue-grey-1"
              class="win-btn win-btn-regular q-ma-none"
              size="md"
              dense
              @click="minimize"
            />
            <q-btn
              flat
              icon="crop_square"
              color="none"
              text-color="blue-grey-1"
              class="win-btn win-btn-regular q-ma-none"
              size="md"
              dense
              @click="toggleMaximize"
            />
            <q-btn
              flat
              color="none"
              icon="close"
              class="win-btn win-btn-close q-ma-none"
              size="md"
              dense
              @click="closeApp"
            />
          </q-btn-group>
        </q-bar>

        <div class="q-pa-sm q-pl-md row items-center">
          <div class="non-selectable">
            File
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Open...</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable>
                  <q-item-section>Preferences</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>

                  <q-menu anchor="top end" self="top start">
                    <q-list>
                      <q-item v-for="n in 3" :key="n" dense clickable>
                        <q-item-section>Submenu Label</q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" />
                        </q-item-section>
                        <q-menu auto-close anchor="top end" self="top start">
                          <q-list>
                            <q-item v-for="n in 3" :key="n" dense clickable>
                              <q-item-section>3rd level Label</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup @click="closeApp">
                  <q-item-section>Quit</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>

          <div class="q-ml-md cursor-pointer non-selectable">
            Edit
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>Cut</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Copy</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Paste</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Select All</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
            praesentium molestias a adipisci, dolore vitae odit, quidem
            consequatur optio voluptates asperiores pariatur eos numquam rerum
            delectus commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
// We guard the Electron API calls, but this
// is only needed if we build same app with other
// Quasar Modes as well (SPA/PWA/Cordova/SSR...)

export default {
  setup() {
    // we rely upon
    function minimize() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.minimize();
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.toggleMaximize();
      }
    }

    function closeApp() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.close();
      }
    }

    return { minimize, toggleMaximize, closeApp };
  },
};
</script>

<style lang="scss">
* {
  overflow: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-variant-caps: petite-caps;
}
.win-btn {
  font-weight: 800;
  border-radius: 0px;
  &:hover {
    border-radius: 0px;
  }
}

// .win-btn-regular:hover {
//   background: $blue-grey-9;
// }
.win-btn-close:hover {
  border-radius: 0px;
  background: $red-8;
}
</style>
