<template>
  <div>

    <settings-modal ref="settingsModal"
      :vuetable-fields="vuetableFields"
    ></settings-modal>

    <div style="overflow-x: scroll;" :class="['container', loading]">
      

      <vuetable ref="vuetable"
        api-url="https://vuetable.ratiw.net/api/users"
        :fields="fields"
        data-path="data"
        pagination-path=""
        :per-page="perPage"
        :multi-sort="multiSort"
        :detail-row-component="detailRow"
        :css="css.table"
        @vuetable:pagination-data="onPaginationData"
        @vuetable:initialized="onInitialized"
        @vuetable:loading="showLoader"
        @vuetable:loaded="hideLoader"
        @vuetable:cell-clicked="onCellClicked"
        @vuetable:scrollbar-visible="onScrollbarVisible"
      >
        <template slot="tableHeader">
          <vuetable-row-header></vuetable-row-header>
          <row-filter
            :visible="filterRowVisible"
            @vuetable:header-event="onRowHeaderEvent"
          ></row-filter>
        </template>
        <div style="min-width:140px;display:flex;justify-content:space-between;" slot="custom-actions" slot-scope="props">
          <button class="btn" @click="onActionClicked('view-item', props.rowData)">
            <i class="fa fa-eye iconfs"></i>
          </button>
          <button class="btn" @click="onActionClicked('edit-item', props.rowData)">
            <i class="fa fa-edit iconfs"></i>
          </button>
          <button class="btn" @click="onActionClicked('delete-item', props.rowData)">
            <i class="fa fa-trash iconfs"></i>
          </button>
        </div>
      </vuetable>

      <div class="vuetable-pagination ui bottom attached segment grid">
        <vuetable-pagination-info ref="paginationInfo"
        ></vuetable-pagination-info>
        <component :is="paginationComponent" ref="pagination"
          :css="css.pagination"
          @vuetable-pagination:change-page="onChangePage"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import Vuetable from "vuetable-2";
//import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePagination from "@/components/vuetable-2-v2.0.0-beta.4/VuetablePagination";
import VuetablePaginationDropdown from "@/components/vuetable-2-v2.0.0-beta.4/VuetablePaginationDropdown.vue";
import VuetablePaginationInfo from "@/components/vuetable-2-v2.0.0-beta.4/VuetablePaginationInfo.vue";
import VuetableRowHeader from "@/components/vuetable-2-v2.0.0-beta.4/VuetableRowHeader.vue";
import FieldsDef from "./FieldsDef.js";
import MyDetailRow from "./MyDetailRow";
import SettingsModal from "./SettingsModal";
import sweetAlert from "sweetalert2";
import RowFilter from "./RowFilter.vue";
import RowEventHandler from "./RowEventHandler.js";
import css from './vue-table-css.js'

export default {
  name: "MyVuetable",

  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationDropdown,
    VuetablePaginationInfo,
    VuetableRowHeader,
    RowFilter,
    SettingsModal
  },

  data() {
    return {
      css,
      fields: FieldsDef,
      detailRow: MyDetailRow,
      paginationComponent: "vuetable-pagination",
      vuetableFields: false,
      loading: "",
      tableHeight: "600px",
      multiSort: true,
      perPage: 5,
      filterRowVisible: true,
      scrollbarVisible: false,
    };
  },

  watch: {
    perPage(newVal, oldVal) {
      this.$nextTick(() => {
        this.$refs.vuetable.refresh();
      });
    },

    paginationComponent(newVal, oldVal) {
      this.$nextTick(() => {
        this.$refs.pagination.setPaginationData(
          this.$refs.vuetable.tablePagination
        );
      });
    }
  },

  methods: {
    onPaginationData(tablePagination) {
      this.$refs.paginationInfo.setPaginationData(tablePagination);
      this.$refs.pagination.setPaginationData(tablePagination);
    },

    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    onInitialized(fields) {
      this.vuetableFields = fields.filter(field => field.togglable);
    },

    showLoader() {
      this.loading = "loading";
    },

    hideLoader() {
      this.loading = "";
    },

    showSettingsModal() {
      this.$refs.settingsModal.show();
    },

    onCellClicked({ data, field, event }) {
      if (field.name !== this.fieldPrefix + "actions") {
        this.$refs.vuetable.toggleDetailRow(data.id);
      }
    },

    onActionClicked(action, data) {
      //sweetAlert(action, data.name);
      console.log(action, data)
    },

    onRowHeaderEvent(type, payload) {
      console.log("onRowHeaderEvent:", type, payload);

      let handler = RowEventHandler;

      return typeof handler[type] === "function"
        ? handler[type](this, this.$refs.vuetable, payload)
        : console.log("Unhandled event: ", type, payload);
    },

    onScrollbarVisible(toggle) {
      this.scrollbarVisible = toggle;
    }
  }
};
</script>

<style>
td, th{
  /*min-width: 200px !important;*/
}
.vuetable button.ui.button {
  padding: 0.5em 0.5em;
  font-weight: 400;
}
.vuetable button.ui.button i.icon {
  margin-right: 0px !important;
}
.ui.grid.toolbar {
  padding-bottom: 10px;
}
.iconfs {
  font-size:10px !important;
  margin:0;
  padding:0;
}
.vuetable-body > tr > td{
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
}
</style>
