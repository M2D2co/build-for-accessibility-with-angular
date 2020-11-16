import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  resources = [
    { categoryName: 'Conformace Testing',
      links: [
        { source: 'https://accessibilityinsights.io/docs/en/web/overview', label: 'Accessibility Insights for Web' },
        { source: 'https://www.deque.com/axe/', label: 'Axe' },
        { source: 'https://developers.google.com/web/tools/lighthouse/', label: 'Lighthouse' },
    ]},
    { categoryName: 'Development Environment',
      links: [
        { source: 'https://stylelint.io/', label: 'stylelint' },
        { source: 'https://typescript-eslint.io', label: 'TypeScript EsLint' },
        { source: 'https://github.com/htmlhint/HTMLHint', label: 'HTMLHint' }
    ]},
    { categoryName: 'Validators',
      links: [
        { source: 'https://jigsaw.w3.org/css-validator/', label: 'W3C CSS Validation Service' },
        { source: 'https://validator.w3.org/', label: 'W3C Markup Validation Serivce' },
    ]},
    { categoryName: 'Visualization', links: [
      { source: 'https://khan.github.io/tota11y/', label: 'Tota11y' },
      { source: 'https://wave.webaim.org/extension/', label: 'Wave' },
    ]},
    { categoryName: 'Other', links: [
      { source: 'https://www.w3.org/WAI/planning/statements/', label: 'Developing an Accessibility Statement' }
    ]}
  ];

  constructor() { }

  ngOnInit(): void {}

  onNavigate(url: string): void {
    window.open(url, '_blank');
  }

}
