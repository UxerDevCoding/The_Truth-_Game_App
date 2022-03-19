import { mount, shallowMount} from "@vue/test-utils";
import Counter from '@/components/Counter';

describe('Counter Component', () => {

    let wrapper = shallowMount(Counter)

    beforeEach(() => {
        wrapper= shallowMount(Counter)
    })

    // test('result equal in snapshot', () => {

    //     expect(wrapper.html()).toMatchSnapshot()
    // });

    test('h2 value dom is equal than value counter', () => {
        

        expect(wrapper.find('h2'). exists()).toBeTruthy();

        const h2 = wrapper.find('h2');

        expect(h2.text()).toBe('Counter');
     })

    test('p data test id value must be 100', () => {

        const value = wrapper.find('[data-test-id="counter"]').text();

        expect(value).toBe('100');
    })  

    test('button increase 2 in counter value', async () => {

        const wrapper = mount(Counter)

        const increaseBtn = wrapper.find('#btn-increase');

        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
       
        const value = wrapper.find('[data-test-id="counter"]').text();

        expect(value).toBe('102');

    })

    test('button increase 2 in counter value', async () => {

        const wrapper = mount(Counter)

        const decreaseBtn = wrapper.find('#btn-decrease');

        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');

       const value = wrapper.find('[data-test-id="counter"]').text();

        expect(value).toBe('98');

    })
});