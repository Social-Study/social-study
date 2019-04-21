// Test the landing page functionality

import { shallowMount } from '@vue/test-utils';
import Landing from '@/views/Landing';
import { sum } from "@vue/cli-plugin-unit-jest";

describe('Landing', () => {
  // your tests go here
  const wrapper = shallowMount(Landing);

  it('is a test', () => {
    expect(1 + 2).toBe(3);
  })
})
