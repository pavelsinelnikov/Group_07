<template>
  <div>
    <h2>Contact Us</h2>
    <h3>Pavel</h3>
    <ul>
      <li>Email: {{email}}</li>
      <li>Website: {{web}}</li>
    </ul>
    <h3>Andrew</h3>
    <ul>
      <li>Email: {{email}}</li>
      <li>Website: {{web}}</li>
    </ul>
    <h3>Geoff</h3>
    <ul>
      <li>Email: {{email}}</li>
      <li>Website: {{web}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data(){
    return {
      email: '@.com',
      web: '@.com'
    }
  }
}
</script>
