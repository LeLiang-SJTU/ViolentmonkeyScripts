// ==UserScript==
// @name         页面导航及目录
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  智能页面导航工具，包含目录生成和快速滚动功能
// @author       Luo Luo
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    // 创建悬浮按钮容器
    const floatContainer = document.createElement('div');
    floatContainer.style.position = 'fixed';
    floatContainer.style.bottom = '20px';
    floatContainer.style.right = '20px';
    floatContainer.style.zIndex = '1000';
    floatContainer.style.display = 'flex';
    floatContainer.style.flexDirection = 'column';
    floatContainer.style.gap = '10px';

    // 创建向上箭头按钮
    const upButton = document.createElement('button');
    upButton.innerText = '↑';
    upButton.style.padding = '10px';
    upButton.style.backgroundColor = '#007BFF';
    upButton.style.color = '#FFF';
    upButton.style.border = 'none';
    upButton.style.borderRadius = '50%';
    upButton.style.cursor = 'pointer';
    upButton.style.fontSize = '16px';
    upButton.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // 创建目录按钮
    const tocButton = document.createElement('button');
    tocButton.innerText = '📖';
    tocButton.style.padding = '10px';
    tocButton.style.backgroundColor = '#28A745';
    tocButton.style.color = '#FFF';
    tocButton.style.border = 'none';
    tocButton.style.borderRadius = '50%';
    tocButton.style.cursor = 'pointer';
    tocButton.style.fontSize = '16px';
    tocButton.onclick = toggleTocPanel;

    // 创建向下箭头按钮
    const downButton = document.createElement('button');
    downButton.innerText = '↓';
    downButton.style.padding = '10px';
    downButton.style.backgroundColor = '#DC3545';
    downButton.style.color = '#FFF';
    downButton.style.border = 'none';
    downButton.style.borderRadius = '50%';
    downButton.style.cursor = 'pointer';
    downButton.style.fontSize = '16px';
    downButton.onclick = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    // 将按钮添加到容器中
    floatContainer.appendChild(upButton);
    floatContainer.appendChild(tocButton);
    floatContainer.appendChild(downButton);
    document.body.appendChild(floatContainer);

    // 创建目录面板
    const tocPanel = document.createElement('div');
    tocPanel.style.position = 'fixed';
    tocPanel.style.bottom = '100px';
    tocPanel.style.right = '20px';
    tocPanel.style.backgroundColor = '#FFF';
    tocPanel.style.border = '1px solid #CCC';
    tocPanel.style.borderRadius = '5px';
    tocPanel.style.padding = '10px';
    tocPanel.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    tocPanel.style.zIndex = '1000';
    tocPanel.style.display = 'none';
    tocPanel.style.width = '200px';
    tocPanel.style.maxHeight = '300px';
    tocPanel.style.overflowY = 'auto';
    tocPanel.style.cursor = 'move';

    // 添加目录面板到页面
    document.body.appendChild(tocPanel);

    // 标记目录面板是否可见
    let isTocVisible = false;

    // 切换目录面板的显示状态
    function toggleTocPanel() {
        if (isTocVisible) {
            tocPanel.style.display = 'none';
        } else {
            generateToc();
            tocPanel.style.display = 'block';
        }
        isTocVisible = !isTocVisible;
    }

    // 生成目录
    function generateToc() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        tocPanel.innerHTML = '';
        headings.forEach((heading, index) => {
            const tocItem = document.createElement('div');
            tocItem.innerText = heading.innerText;
            tocItem.style.paddingLeft = `${(parseInt(heading.tagName[1]) - 1) * 10}px`;
            tocItem.style.cursor = 'pointer';
            tocItem.style.marginBottom = '5px';
            tocItem.onclick = () => scrollToHeading(heading);
            tocItem.ondblclick = () => toggleCollapse(tocItem);
            tocPanel.appendChild(tocItem);
        });
    }

    // 滚动到指定标题
    function scrollToHeading(heading) {
        heading.scrollIntoView({ behavior: 'smooth' });
        highlightCurrentHeading();
    }

    // 高亮当前标题
    function highlightCurrentHeading() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
            const rect = heading.getBoundingClientRect();
            const tocItem = tocPanel.children[index];
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                tocItem.style.backgroundColor = '#F0F0F0';
            } else {
                tocItem.style.backgroundColor = 'transparent';
            }
        });
    }

    // 双击展开或折叠目录项
    function toggleCollapse(tocItem) {
        const isCollapsed = tocItem.style.color === 'gray';
        tocItem.style.color = isCollapsed ? 'inherit' : 'gray';
        tocItem.style.textDecoration = isCollapsed ? 'none' : 'line-through';
    }

    // 监听滚动事件，更新高亮
    window.addEventListener('scroll', highlightCurrentHeading);

    // 使目录面板可拖动
    let isDragging = false;
    let offsetX, offsetY;

    tocPanel.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - tocPanel.getBoundingClientRect().left;
        offsetY = e.clientY - tocPanel.getBoundingClientRect().top;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            tocPanel.style.left = `${e.clientX - offsetX}px`;
            tocPanel.style.top = `${e.clientY - offsetY}px`;
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
})();