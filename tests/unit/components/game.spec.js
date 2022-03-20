import { mount, shallowMount} from "@vue/test-utils";
import Game from '@/components/Game';

describe('Game Component', () => {

    let wrapper = shallowMount(Game);
    let clgSpy;
    
    //mock fetch
    global.fetch = jest.fn(()=> Promise.resolve({
        json: () => Promise.resolve ({ 
            "answer": "yes",
            "forced": false,
            "image": "https://yesno.wtf/assets/yes/2.gif"     
        }),
    })); 

    beforeEach(() => {
        wrapper= shallowMount(Game); 

        clgSpy = jest.spyOn(console, 'log');

        jest.clearAllMocks();
    })

    test('result equal in snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()
    });

    test('write in input trigger only the console log in watcher', async () => {

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('Hola log');

        expect(clgSpy).toHaveBeenCalledTimes(1);
        expect(getAnswerSpy).not.toHaveBeenCalled();
     
    });

    test(' write "?" in input should trigger getAnswer', async () => {

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('Hola getAnswer?');

        expect(clgSpy).toHaveBeenCalledTimes(2);
        expect(getAnswerSpy).toHaveBeenCalled();


    });

    test('getAnswer funciton after fetch', async () => {

        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect(img.exists()).toBeTruthy;
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
        expect(wrapper.vm.answer).toBe('Si!')

    });

    test('getAnswer funciton after fetch - API fail', async () => {

        fetch.mockImplementationOnce(() => Promise.reject('API fail'));

        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect(img.exists()).toBeFalsy;
        expect(wrapper.vm.answer).toBe('No se pudo cargar el API');

    });

});