<template>
  <ul v-show="tablePagination && lastPage > firstPage" :class="$_css.wrapperClass">
    <li @click="loadPage(firstPage)"
      :class="['btn-nav', $_css.linkClass, isOnFirstPage ? $_css.disabledClass : '']">
        <a href="#!">
          <i v-if="$_css.icons.first != ''" :class="[$_css.icons.first]"></i>
          <span v-else>&laquo;</span>
        </a>
    </li>
    <li @click="loadPage('prev')"
      :class="['btn-nav', $_css.linkClass, isOnFirstPage ? $_css.disabledClass : '']">
        <a href="#!">
          <i v-if="$_css.icons.next != ''" :class="[$_css.icons.prev]"></i>
          <span v-else>&nbsp;&lsaquo;</span>
        </a>
    </li>
    <template v-if="notEnoughPages">
      <template v-for="(n, i) in totalPage">
        <li @click="loadPage(i+firstPage)" :key="i"
          :class="[$_css.pageClass, isCurrentPage(i+firstPage) ? $_css.activeClass : '']"
          >
          <a href="#!">
            {{ n }}
          </a>
        </li>
      </template>
    </template>
    <template v-else>
      <template v-for="(n, i) in windowSize">
        <li @click="loadPage(windowStart+i+firstPage-1)" :key="i"
          :class="[$_css.pageClass, isCurrentPage(windowStart+i+firstPage-1) ? $_css.activeClass : '']"
          >
          <a href="#!">
            {{ windowStart+n-1 }}
          </a>
        </li>
      </template>
    </template>
    <li @click="loadPage('next')"
      :class="['btn-nav', $_css.linkClass, isOnLastPage ? $_css.disabledClass : '']">
        <a href="#!">
          <i v-if="$_css.icons.next != ''" :class="[$_css.icons.next]"></i>
          <span v-else>&rsaquo;&nbsp;</span>
        </a>
    </li>
    <li @click="loadPage(lastPage)"
      :class="['btn-nav', $_css.linkClass, isOnLastPage ? $_css.disabledClass : '']">
        <a href="#!">
          <i v-if="$_css.icons.last != ''" :class="[$_css.icons.last]"></i>
          <span v-else>&raquo;</span>
        </a>
    </li>
  </ul>
</template>

<script>
import PaginationMixin from './VuetablePaginationMixin.vue'

export default {
  mixins: [PaginationMixin],
}
</script>
<style>
  .vuetable-pagination {
    background: #f9fafb !important;
  }
</style>