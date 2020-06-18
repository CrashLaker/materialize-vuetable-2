import moment from "moment";
import accounting from "accounting";
import VuetableFieldHandle from "@/components/vuetable-2-v2.0.0-beta.4/VuetableFieldHandle.vue";
import VuetableFieldSequence from "@/components/vuetable-2-v2.0.0-beta.4/VuetableFieldSequence.vue";
import VuetableFieldCheckbox from "@/components/vuetable-2-v2.0.0-beta.4/VuetableFieldCheckbox.vue";

export default [
  {
    // name: '__handle',
    name: VuetableFieldHandle,
  },
  {
    name: VuetableFieldSequence,
    title: "No.",
    titleClass: "right aligned",
    dataClass: "right aligned"
  },
  {
    name: VuetableFieldCheckbox,
    title: "checkbox",
    titleClass: "center aligned",
    dataClass: "center aligned",
    togglable: true
  },
  {
    name: "id",
    title: '<i class="fa fa-list"></i>',
    titleClass: "center aligned",
    dataClass: "center aligned",
    formatter: (value, vuetable) => {
      let icon = vuetable.isVisibleDetailRow(value) ? "less" : "more";
      return [
        '<a class="show-detail-row">',
        '<i class="material-icons">expand_'+icon+'</i>',
        "</a>"
      ].join("");
    }
  },
  {
    name: "name",
    sortField: "name",
    title: '<i class="grey user outline icon"></i>Name',
    filterable: true,
    togglable: true
  },
  {
    name: "email",
    sortField: "email",
    title: '<i class="fa fa-envelope"></i> Email',
    filterable: true,
    togglable: true
  },
  {
    name: "group.description",
    sortField: "group.description",
    title: '<i class="fa fa-users"></i> Group',
    filterable: true,
    togglable: true
  },
  // {
  //   name: "birthdate",
  //   sortField: 'birthdate',
  //   title: '<i class="grey birthday icon"></i>Birthdate',
  //   width: "13%",
  //   formatter: (value) => {
  //     return (value === null)
  //       ? ''
  //       : moment(value, 'YYYY-MM-DD').format('MMM Do, YYYY')
  //   }
  // },
  {
    name: "gender",
    sortField: "gender",
    title: '<i class="fa fa-venus-mars"></i> Gender',
    titleClass: "center aligned",
    dataClass: "center aligned",
    filterable: true,
    formatter: value => {
      return value.toUpperCase() === "M"
        ? '<div class="teal chip lighten-1"><i class="fa fa-male"></i> Male</div>'
        : '<div class="pink chip lighten-1" style="width:80px;"><i class="fa fa-female"></i> Female</div>';
    },
    togglable: true
  },
  {
    name: "salary",
    sortField: "salary",
    title: '<i class="material-icons">payment</i> Salary',
    width: '100px',
    titleClass: "center aligned",
    dataClass: "right aligned",
    filterable: true,
    formatter: value => accounting.formatNumber(value, 2),
    togglable: true
  },
  {
    name: "custom-actions",
    title: "Actions",
    titleClass: "center aligned",
    dataClass: "center aligned"
  }
];
