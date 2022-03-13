export default {
    name: 'router-link',
    props: {
        to: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
        },
    },
    // this指代当前组件
    render(h){
        let tag = this.tag || 'a';
        // return <a>{this.$slots.default}</a>
        return h(tag, {
            on: {
                click: this.clickHandler,
            },
            attrs: {
                href: this.$router.mode == 'hash' ? "#"+this.to : this.to,
            }
        }, this.$slots.default);
    },

    methods: {
        clickHandler(e){
            e.preventDefault();
            this.$router.push(this.to);
        }
    }
}