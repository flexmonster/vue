<script setup>
import { ref } from 'vue'
import '@flexmonster/flexmonster/flexmonster.css'
import FlexmonsterComposite from '../src/FlexmonsterComposite.vue'
import FlexmonsterToolbar from '../src/FlexmonsterToolbar.vue'
import FlexmonsterFlat from '../src/FlexmonsterFlat.vue'
import FlexmonsterFlatFieldList from '../src/FlexmonsterFlatFieldList.vue'
import FlexmonsterPivot from '../src/FlexmonsterPivot.vue'
import FlexmonsterPivotFieldList from '../src/FlexmonsterPivotFieldList.vue'

// Template refs — equivalent of Angular's viewChild
const compositeRef = ref(null)
const flatRef = ref(null)
const pivotRef = ref(null)
const toolbarFlatRef = ref(null)
const toolbarPivotRef = ref(null)
const fieldListFlatRef = ref(null)
const fieldListPivotRef = ref(null)

// API call helpers
function openFieldListComposite() {
  compositeRef.value.flexmonster.openFieldList()
}

function openFieldListFlat() {
  toolbarFlatRef.value.toolbar.openFieldList()
}

function openFieldListPivot() {
  toolbarPivotRef.value.toolbar.openFieldList()
}

function getCellFlat() {
  const cell = flatRef.value.flatTable.getCell(0, 0)
  alert(`Value of the first cell: ${cell.value}`)
}

function getCellPivot() {
  const cell = pivotRef.value.pivotTable.getCell(0, 0)
  alert(`Value of the first cell: ${cell.value}`)
}

function setViewType(type) {
  compositeRef.value.flexmonster.setViewType(type)
}

function changeState() {
  currentStateFmFlexmonster.value = stateFmFlexmonsterSimple
}

const disabled = true

const optionsFmPivot = {
  viewType: 'flat',
  totalRowPosition: "before"
}

const stateFmFlexmonster = {
  id: 'state-0',
  dataset: {
    dataSource: {
      data: [{ Year: 2021, Gender: 'Male', Name: 'Liam', Count: 20000, State: 'CA' }],
      type: 'json',
    },
  },
  slice: {
    rows: [{ name: 'Year' }, { name: 'Gender' }, { name: 'Name' }],
    values: [{ name: 'Count', aggregation: 'sum' }],
    columns: [{ name: 'State' }],
  },
}

const stateFmFlexmonsterSimple = {
  id: 'state-0',
  dataset: stateFmFlexmonster.dataset,
  slice: {
    rows: [{ name: 'Name' }],
    values: [{ name: 'Count', aggregation: 'sum' }],
    columns: [{ name: 'State' }],
  },
}

const currentStateFmFlexmonster = ref(stateFmFlexmonster)


const stateFmFlat = {
  id: 'state-1',
  dataset: {
    dataSource: {
      data: [{ Year: 2021, Gender: 'Male', Name: 'Liam', Count: 20000, State: 'CA' }],
      type: 'json',
    },
  },
}

const stateFmPivot = {
  id: 'state-2',
  dataset: {
    dataSource: {
      data: [{ Year: 2021, Gender: 'Male', Name: 'Liam', Count: 20000, State: 'CA' }],
      type: 'json',
    },
  },
  slice: {
    rows: [{ name: 'Year' }, { name: 'Gender' }, { name: 'Name' }],
    values: [{ name: 'Count', aggregation: 'sum' }],
    columns: [{ name: 'State' }],
  },
}
</script>

<template>
  <main>
    <h1>Vue Flexmonster Showcase</h1>

    <h2 id="flexmonster">Flexmonster</h2>
    <fm-button size="sm" @click="openFieldListComposite">Open Field List</fm-button>
    <fm-button size="sm" @click="setViewType('flat')">Flat view</fm-button>
    <fm-button size="sm" @click="setViewType('pivot')">Pivot view</fm-button>
    <fm-button size="sm" @click="changeState">Change state</fm-button>

    <FlexmonsterComposite ref="compositeRef" :state="currentStateFmFlexmonster" :options="optionsFmPivot"
      service-id="main-grid" />
    <h2 id="flat">Flat</h2>
    <fm-button size="sm" @click="openFieldListFlat">Open field list</fm-button>
    <fm-button size="sm" @click="getCellFlat">Get 1st cell</fm-button>

    <FlexmonsterToolbar ref="toolbarFlatRef" :state="stateFmFlat" />
    <FlexmonsterFlat ref="flatRef" :state="stateFmFlat" />
    <FlexmonsterFlatFieldList ref="fieldListFlatRef" :state="stateFmFlat" />

    <h2 id="pivot">Pivot</h2>
    <fm-button size="sm" @click="openFieldListPivot">Open field list</fm-button>
    <fm-button size="sm" @click="getCellPivot">Get 1st cell</fm-button>

    <FlexmonsterToolbar ref="toolbarPivotRef" :state="stateFmPivot" />
    <FlexmonsterPivot ref="pivotRef" :state="stateFmPivot" />
    <FlexmonsterPivotFieldList ref="fieldListPivotRef" :state="stateFmPivot" />

    <h2 id="toolkit">Toolkit elements use example</h2>
    <fm-button size="sm" :disabled="disabled">Custom Button</fm-button>
    <fm-selectable-list data-provider="1,2,3" />
  </main>
</template>

<style></style>