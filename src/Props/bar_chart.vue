/* app.vue */
<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        animationEnabled: true,
        exportEnabled: true,
        title:{
        //   text: "Total Model Laptop Sale For Year 2025"
        },
        axisX: {
          labelTextAlign: "right"
        },
        axisY: {
        //   title: "in Million Tonnes per Year",
          suffix: "M"
        },
        data: [{
          type: "bar",
          yValueFormatString: "#,###M tonnes",
          dataPoints: [
            { label: "Microsoft", y: 12 },
            { label: "Acer", y: 18 },
            { label: "HP", y: 27 },
            { label: "Dell", y: 42 },
            { label: "Apple", y: 47 },
            { label: "MSI", y: 59 },
            { label: "Lenovo", y: 65 },
            { label: "Asus", y: 146 }
          ]
        }]
      }
    }
  }
}
</script>
<template>
    <CanvasJSChart :options="options"/>
</template>                              