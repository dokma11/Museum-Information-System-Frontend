import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  @Input() employees: Employee[] = [];
  @Output() toggleLock = new EventEmitter<number>();
  
  onToggleLock(employeeId: number): void {
    this.toggleLock.emit(employeeId);
  }

}