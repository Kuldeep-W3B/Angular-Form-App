import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private organizations = [
    { name: 'Tech Innovators', id: 'ORG-12345' },
    { name: 'Creative Solutions', id: 'ORG-67890' },
    { name: 'Future Enterprises', id: 'ORG-54321' }
  ];

  getOrganizationId(name: string): Observable<string | null> {
    const organization = this.organizations.find(org => org.name === name);
    return of(organization ? organization.id : null);
  }

  getOrganizations(): Observable<{ name: string; id: string }[]> {
    return of(this.organizations);
  }
}
