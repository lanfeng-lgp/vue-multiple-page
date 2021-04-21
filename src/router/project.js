let project = [
    {
        path: '/',
        name: 'projectIndex',
        meta: {
            title: '首页'
        },
        component: () =>
            import('@/pages/project/index.vue')
    }
];

export default project