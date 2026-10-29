# Markwise
A bookmark manager for managing all your bookmarked pages

## Sample Design

![Sample Design Image](assets/design.png)

## Database Design

```javascript
const users = [
    {
        id: 1,
        username: "vaibhav",
        password: "123123"
    },
    {
        id: 2,
        username: "cheryl",
        password: "123123"
    }
];

const bookmarks = [
    {
        id: 1,
        title: "Claude",
        logo: "",
        description: "An AI assistant created by Anthropic",
        link: "https://claude.ai/new",
        visitedCount: 10,
        createdAt: "10 Feb 2026",
        userId: 1
    },
    {
        id: 2,
        title: "ChatGpt",
        logo: "",
        description: "An AI assistant created by OpenAI",
        link: "https://chatgpt.com/",
        visitedCount: 4,
        createdAt: "10 Mar 2026",
        userId: 2
    },
    {
        id: 3,
        title: "Dev Community",
        logo: "",
        description: "Social network for software developers",
        link: "https://dev.to/",
        visitedCount: 29,
        createdAt: "3 Jan 2026",
        userId: 1
    }
]
```
