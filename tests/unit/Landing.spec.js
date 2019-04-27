// Test the landing page functionality

import { mount, createLocalVue } from "@vue/test-utils";
import Landing from "@/views/Landing";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

// Create local vue instance with the router and validation libraries
const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(VueRouter);
const routes = [
  {
    path: "/dashboard",
    name: "dashboard"
  },
  {
    path: "/",
    name: "landing"
  }
];
const router = new VueRouter({ routes });

// Mount the landing component with the router and local vue instance
const wrapper = mount(Landing, { localVue, router });

describe("Landing", () => {
  const loginButton = wrapper.find("#loginButton");

  test("login without username and password", () => {
    loginButton.trigger("click");
    expect(wrapper.vm.$route.name).toEqual("landing");
  });

  test("login with correct username and password", () => {
    wrapper.vm.email = "ecb11@ptd.net";
    wrapper.vm.password = "123456";
    loginButton.trigger("click");
    expect(wrapper.vm.$route.name).toEqual("dashboard");
  });
});
