<script>
//* -------------------------------------------------------------------------- */
//*                                   SCRIPT                                   */
//* -------------------------------------------------------------------------- */
// const { ipcRenderer } = require('electron')
//_ ipcRenderer.on('winRestored', () => {
//_ 	winRestore()
//_ })
//_ ipcRenderer.on('winMaximized', () => winMaximize())

export default {
  name: "titlebar",
  //* ---------------------------------- DATA ---------------------------------- */
  data: function () {
    return {
      status: "normal",
      isMaximized: false,
    };
  },
  //* -------------------------------- MOUNTED ------------------------------- *//
  mounted() {
    //_ const { ipcRenderer } = require('electron')
    // setInterval(() => {
    // 	// this.$electron.ipcRenderer.send('ping')
    // 	ipcRenderer.send('ping')
    // 	console.log('Ping')
    // }, 5000)

    // this.$electron.
    ipcRenderer.on("pong", (event, data) => {
      console.log("Pong received: ", data);
    });
  },
  //* ------------------------------- DESTROYED ------------------------------ *//
  // destroyed() {
  // 	this.$electron.ipcRenderer.removeAllListeners()
  // },
  //* --------------------------------- METHODS -------------------------------- */
  methods: {
    toggleMaximize: function () {
      // this.isMaximized = !this.isMaximized
      console.log("toggleMaximize");
    },
    winMinimize: function () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().minimize();
      //_ this.status = 'minimized'
      console.log("winMinimize", "App minimized");
    },
    winMaximize: function () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().maximize();
      this.status = "maximized";
      console.log("winMaximize", "App maximized");
    },
    winRestore: function () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().restore();
      this.status = "normal";
      console.log("winRestore", "App restored");
    },
    winClose: function () {
      ipcRenderer.send("winClose");
    },
  },
  //* -------------------------------- COMPUTED -------------------------------- */
};
//_ computed: {
//_ 	winStatus() {
//_ 		return this.$store.getters.finishedGame.finished
//_ 	},
//_ },
/*








*/
</script>
//* ------------------------------------------------------------------------ *//
//* ------------------------------- TEMPLATE ------------------------------- *//
//* ------------------------------------------------------------------------ *//

<template>
  <div id="titlebar">
    <div id="drag-region">
      <div id="window-icon">
        <img
          src="static/icons/SB_Icon-GPF1.svg"
          alt="App icon"
          draggable="false"
        />
      </div>
      <div id="window-title">
        <span>CADsichter v0.1</span>
      </div>

      <div id="window-controls">
        <div class="button" id="min-button" @click="winMinimize()">
          <img
            class="icon"
            src="static/img/titlebar/icon_minimize.svg"
            draggable="false"
          />
        </div>
        <div
          class="button"
          id="max-button"
          v-if="status === 'normal'"
          @click="winMaximize()"
        >
          <img
            class="icon"
            src="static/img/titlebar/icon_maximize.svg"
            draggable="false"
          />
        </div>
        <div
          class="button"
          id="restore-button"
          v-if="status === 'maximized'"
          @click="winRestore()"
        >
          <img
            class="icon"
            src="static/img/titlebar/icon_restore.svg"
            draggable="false"
          />
        </div>
        <div class="button" id="close-button" @click="winClose()">
          <img
            class="icon"
            src="static/img/titlebar/icon_close.svg"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

//* ------------------------------------------------------------------------ *//
//* --------------------------------- STYLE -------------------------------- *//
//* ------------------------------------------------------------------------ *//
<style lang="scss" scoped>
// @import '@/index';

#titlebar {
  // height: $h_title;
  height: 24px;
  width: 100vw;
  margin: auto;
  margin-right: 0px;
  // color: $color_l5;
  // background-color: $bg_wintitle;
  // grid-area: 1 / 1 / last-line / last-row;
  // grid-area: "titlebar";

  // .maximized {
  //   width: 100vw;
  //   padding: 0;
  // }
  // .minimized {
  //   width: 100vw;
  //   padding: 0;
  // }
  // .restored {
  //   width: 100vw;
  //   padding: 0;
  // }
  // #drag-region {
  //   width: 100%;
  //   height: 100%;
  //   -webkit-app-region: drag;
  //   display: grid;
  //   grid-template-columns: 32px auto 138px;
  // }

  // #window-icon {
  //   grid-column: 1;
  //   display: flex;
  //   align-items: center;
  //   margin: auto;
  //   overflow: hidden;
  //   -webkit-app-region: drag;
  //   user-select: none;

  //   img {
  //     height: 24px;
  //     user-select: none;
  //     -webkit-app-region: drag;
  //   }
  // }

  // #window-title {
  //   grid-column: 2;
  //   display: grid;
  //   align-items: center;
  //   margin: 0px 10px;
  //   overflow: hidden;
  //   font-size: 16px;

  //   .maximized {
  //     margin-left: 12px;
  //   }

  //   span {
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     white-space: nowrap;
  //     line-height: 1.5;
  //     place-self: center center;
  //     user-select: none;
  //   }
  // }
  // #window-controls {
  //   display: grid;
  //   grid-template-columns: repeat(3, 46px);
  //   position: fixed;
  //   top: 0;
  //   right: 0;
  //   // height: $h_title;
  //   -webkit-app-region: no-drag;

  //   .button {
  //     grid-row: 1 / span 1;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     width: 100%;
  //     height: 100%;
  //     user-select: none;

  //     &:hover {
  //       background: rgba(255, 255, 255, 0.2);
  //     }
  //     &:active {
  //       background: rgba(255, 255, 255, 0.4);
  //     }
  //   }
  // }

  // #close-button {
  //   &:hover {
  //     background: #e81123 !important;
  //   }

  //   &:active {
  //     background: #f1707a !important;

  //     .icon {
  //       filter: invert(1);
  //     }
  //   }
  // }

  // #min-button {
  //   grid-column: 1;
  // }
  // #max-button,
  // #restore-button {
  //   grid-column: 2;
  // }
  // #close-button {
  //   grid-column: 3;
  // }
}

// @media (-webkit-device-pixel-ratio: 1.5),
//   (device-pixel-ratio: 1.5),
//   (-webkit-device-pixel-ratio: 2),
//   (device-pixel-ratio: 2),
//   (-webkit-device-pixel-ratio: 3),
//   (device-pixel-ratio: 3) {
//   #window-controls .icon {
//     width: 10px;
//     height: 10px;
//   }
// }
</style>
