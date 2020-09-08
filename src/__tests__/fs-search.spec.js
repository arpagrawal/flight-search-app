import { shallowMount } from '@vue/test-utils';
import FsSearch from '../components/fs-search/fs-search.vue';

describe('Search Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  it('should load the main div', () => {
    const wrapper = shallowMount(FsSearch, {
      propsData: {},
      mocks: {},
      stubs: {},
      methods: {},
    });
    const wrapperHTML = wrapper.html();
    expect(wrapperHTML).toContain('fs-search');
  });

  it('should have all the elements in the html when component is loaded', () => {
    const wrapper = shallowMount(FsSearch);

    const wrapperHTML = wrapper.html();

    expect(wrapperHTML).toContain('fs-primary');
    expect(wrapperHTML).toContain('from-city');
    expect(wrapperHTML).toContain('to-city');
    expect(wrapperHTML).toContain('persons');
    expect(wrapperHTML).toContain('trip-selector');
  });

  it('Check emitted "searchFlight" event', () => {
    const wrapper = shallowMount(FsSearch);

    const mockData = {
      origin: 'Delhi (DEL)',
      destination: 'Mumbai (BOM)',
      departureDate: 'Sun Nov 01 2020 00:00:00 GMT+0530 (India Standard Time)',
      passengers: '1',
    };

    wrapper.vm.$emit('searchFlight', mockData);
    expect(wrapper.emitted().searchFlight).toBeTruthy();
  });
});
