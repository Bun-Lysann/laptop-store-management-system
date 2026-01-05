/* App.vue */
<script>

  export default {
    data() {
      return {
        options: {
          theme: "light2",
          animationEnabled: true,
          title:{
            text: "Visitors By Store"
          },
          data: [{
            type: "pie",
            indexLabel: "{label} (#percent%)",
            yValueFormatString: "#,##0",
            toolTipContent: "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
            dataPoints: [
              { label: "ASUS", y: 130631 },
              { label: "MSI", y: 28874 },
              { label: "Lenovo", y: 15467 },
              { label: "Mac", y: 10543 },
              { label: "Dell", y: 5613 },
              { label: "Microsoft", y: 8492 }
            ]
          }]
        },
        styleOptions: {
          width: "100%",
          height: "360px"
        }
      }
    }
  }
</script>
<template>
  <CanvasJSChart :options="options" :styles="styleOptions"/>
</template>                              