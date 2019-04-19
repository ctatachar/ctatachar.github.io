window.addEventListener('load', function () {

    Vue.component('shopping-list-comp', {
      template: '#shopping-list-templ',
      props: {
        list: {default: []}
      },
      data() {
        return {
          newItem: ''
        };
      },
      computed: {
        pending() {
          return this.list.filter(this.toBuy).length;
        }
      },
      methods: {
        addItem() {
          if (this.newItem) {
            this.list.push({
              name: this.newItem,
              purchased: false
            });
            this.newItem = '';
          }
        },
        purchasedItem(item) {
          item.purchased = ! item.purchased;
        },
        removeItem(index) {
          this.list.splice(index, 1);
        },
        clearList() {
          this.list = [];
          localStorage.clear();
        },
        toBuy(item) {
          return ! this.isPurchased(item);
        },
        isPurchased(item) {
          return item.purchased;
        }
      }
    });
    
    Vue.component('list-item', {
      template: '#list-item',
      props: ['item'],
      computed: {
        className() {
          let classes = ['list__item__toggle'];
          if (this.item.purchased) {
            classes.push('list__item__toggle--purchased');
          }
          return classes.join(' ');
        }
      }
    });
    
    new Vue({
      el: '#sl-app',
      data: {
        newItem: '',
        list: [],
      },
      mounted() {
        console.log('App mounted');
        if (localStorage.getItem('list')) this.list = JSON.parse(localStorage.getItem('list'));
      },
      watch: {
        list: {
          handler() {
            console.log('list changed');
            localStorage.setItem('list', JSON.stringify(this.list));
          },
          deep: true,
        },
      }
    });
    
    //closing window onload
    })