const basic = `body {
  font-size: 14px;
}

.heading {
  color: #000;
}

.menu {
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.sidebar {
  background: #f1f1f1;
}

.sidebar__heading {
  font-size: 20px;
}
`;

const maxBreakpoint = `body {
  font-size: 14px;
}

@media (min-width: 768px) {
  body {
    font-size: 16px;
  }
}

.heading {
  color: #000;
}

.menu {
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.sidebar {
  background: #f1f1f1;
}

.sidebar__heading {
  font-size: 20px;
}
`;

const excludedBlocks = `body {
  font-size: 14px;
}

.heading {
  color: #000;
}

.menu {
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
`;

exports.cssOutput = {
  basic,
  maxBreakpoint,
  excludedBlocks
};
